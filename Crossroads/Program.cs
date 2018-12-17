using System;

namespace Crossroads
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("------------Star simulation crossroad------------");

            var simulation = new CrossroadsSim();
            simulation.Simulate();

            Console.WriteLine("------------End simulation------------");
            Console.Read();
        }
    }
}
