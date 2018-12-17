using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossroadsWeb.Simulation
{
    public class SimJSON
    {
        public int carsFromAAndOut;
        public int carsFromBAndOut;
        public string simulationTime;
        public string events;
        public IEnumerable<GraphicData> graphic;
    }
}
