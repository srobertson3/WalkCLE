﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Web.DAL;
using WebApplication.Web.Models;

namespace WebApplication.Web.Controllers
{
    public class HomeController : Controller
    {
		private readonly IBadgeSqlDAL dal;

		public HomeController(IBadgeSqlDAL dal)
		{
			this.dal = dal;
		}


		/// <summary>
		/// Shows the home page
		/// </summary>
		/// <returns>The view with the home page</returns>
		public IActionResult Index()
        {            
            return View();
        }

		public IActionResult AllBadges()
		{
			IList<Badge> badges = new List<Badge>();

			badges = dal.GetAllBadges();

			return View(badges);
		}

		#region Microsoft Boilerplate
		public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        #endregion

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
