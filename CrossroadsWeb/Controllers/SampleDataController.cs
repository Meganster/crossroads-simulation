using System;
using Crossroads;
using CrossroadsWeb.Simulation;
using Microsoft.AspNetCore.Mvc;

namespace CrossroadsWeb.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public SimJSON WeatherForecasts()
        {
            try
            {
                var simulation = new CrossroadsSim();
                return simulation.Simulate();
            }
            catch (Exception exception)
            {
                return null;
            }
        }
    }
}
