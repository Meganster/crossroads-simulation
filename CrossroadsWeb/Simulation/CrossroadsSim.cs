using CrossroadsWeb.Simulation;
using SimSharp;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Crossroads
{
    public class CrossroadsSim
    {
        private const int RandomSeed = 42;

        private static readonly TimeSpan PtMean = TimeSpan.FromSeconds(5); // Avg. processing time in minutes
        private static readonly TimeSpan PtSigma = TimeSpan.FromSeconds(1); // Sigma of processing time
        private static readonly TimeSpan PtMin = TimeSpan.FromSeconds(4); // Avg. processing time in minutes
        private static readonly TimeSpan PtMax = TimeSpan.FromSeconds(8); // Sigma of processing time
        private static readonly TimeSpan TrafficLightTimeChange = TimeSpan.FromSeconds(30.0); // Mean time to failure in minutes
        private static readonly TimeSpan CrossroadIntersection = TimeSpan.FromSeconds(3.0);

        private static readonly TimeSpan SimulationTime = TimeSpan.FromHours(1);

        private static List<GraphicData> graphic = new List<GraphicData>();

        private static bool IsACWayGreen = true;
        public static int CarsQueueSizeA = 0;
        public static int CarsQueueSizeB = 0;
        public static int CarsFromAAndOut = 0;
        public static int CarsFromBAndOut = 0;

        private IEnumerable<Event> Working(Simulation env)
        {
            while (true)
            {
                yield return env.Timeout(CrossroadIntersection);

                if (IsACWayGreen == true)
                {
                    if (CarsQueueSizeA > 0)
                    {
                        CarsQueueSizeA--;
                        // Croad out from crossroad
                        CarsFromAAndOut++;
                    }

                    graphic.Add(new GraphicData() {
                        queueGraphicA = CarsQueueSizeA,
                        queueGraphicB = CarsQueueSizeB,
                        date = env.Now
                    });
                }
                else
                {
                    if (CarsQueueSizeB > 0)
                    {
                        CarsQueueSizeB--;
                        // Croad out from crossroad
                        CarsFromBAndOut++;
                    }

                    graphic.Add(new GraphicData()
                    {
                        queueGraphicA = CarsQueueSizeA,
                        queueGraphicB = CarsQueueSizeB,
                        date = env.Now
                    });
                }
            }
        }

        private IEnumerable<Event> TrafficLightGenerator(Simulation env, bool isACWayGreen)
        {
            while (true)
            {
                yield return env.Timeout(TrafficLightTimeChange);

                if (IsACWayGreen == true)
                    IsACWayGreen = false;
                else
                    IsACWayGreen = true;
            }
        }

        private IEnumerable<Event> CarsQueueSizeAInc(Simulation env)
        {
            while (true)
            {
                yield return env.Timeout(env.RandNormal(PtMean, PtSigma));
                CarsQueueSizeA++;
            }
        }

        private IEnumerable<Event> CarsQueueSizeBInc(Simulation env)
        {
            while (true)
            {
                yield return env.Timeout(env.RandUniform(PtMin, PtMax));
                CarsQueueSizeB++;
            }
        }

        public SimJSON Simulate(int rseed = RandomSeed)
        {
            var env = new Simulation(DateTime.Now, rseed);
            var startPerf = DateTime.UtcNow;

            env.Process(TrafficLightGenerator(env, IsACWayGreen));
            env.Process(CarsQueueSizeAInc(env));
            env.Process(CarsQueueSizeBInc(env));
            env.Process(Working(env));
            env.Run(SimulationTime);

            var perf = DateTime.UtcNow - startPerf;

            env.Log("{0} get out {1} cars from A and {2} machines from B.",
                "Cars from AC and BD",
                CarsFromAAndOut,
                CarsFromBAndOut);

            // system log info
            env.Log(string.Empty);
            env.Log("Processed {0} events in {1} seconds ({2} events/s).",
                env.ProcessedEvents,
                perf.TotalSeconds,
                (env.ProcessedEvents / perf.TotalSeconds));

            return new SimJSON()
            {
                carsFromAAndOut = CarsFromAAndOut,
                carsFromBAndOut = CarsFromBAndOut,
                simulationTime = perf.TotalSeconds.ToString(),
                events = env.ProcessedEvents.ToString(),
                graphic = graphic
            };
        }
    }
}
