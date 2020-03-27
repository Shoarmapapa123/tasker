using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MVC_Tasker.DAL;
using MVC_Tasker.Models;

namespace MVC_Tasker.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SpelContext _context;
        private UserManager<IdentityUser> uM;        
        public HomeController(ILogger<HomeController> logger, SpelContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            uM = userManager; 
            _logger = logger;
        }

        public IActionResult Index()
        {
            return RedirectToAction("Game","Home");//return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Game()
        {
            var foundPlayer = _context.Spelers.FirstOrDefault(s => s.Token.Equals(uM.GetUserId(User)));
            if (foundPlayer!=null) 
            {
                if (foundPlayer.SpelId!=null) 
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("JoinList", "Spel");
                }
            }            
            else
            {
                return RedirectToAction("Create","Speler");
            }            
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
