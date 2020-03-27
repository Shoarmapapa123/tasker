using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVC_Tasker.DAL;
using MVC_Tasker.Models;

namespace ReversiApp.Controllers
{
    [Authorize]
    public class SpelController : Controller
    {
        private readonly SpelContext _context;
        private UserManager<IdentityUser> uM;
        public SpelController(SpelContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            uM = userManager;
        }

        // GET: Join
        public IActionResult JoinList()
        {
            
            var listForView = new List<SpelModel>();
            foreach (SpelModel sb  in _context.Spellen.ToList())
            {
                sb.DeserializeBord();
                if (!sb.Afgelopen())
                {
                    if (_context.Spelers.Where(s => s.SpelId.Equals(sb.SpelId)).Count() == 1)
                    {
                        listForView.Add(sb);
                    }
                }
                
            }
            return View(listForView);
            //return View(_context.Spellen.Where(s => s.Spelers.Count == 1).ToList());
        }

        
        
        public async Task<IActionResult> Join(int id)
        {
            SpelerModel spelerFind = _context.Spelers.FirstOrDefault(s => s.Token.Equals(uM.GetUserId(User)));
            spelerFind.SpelId = id;
            spelerFind.Kleur = MVC_Tasker.Kleur.Wit;
            await _context.SaveChangesAsync();
            return RedirectToAction("Game","Home");
        }




        // GET: Spel
        public IActionResult Index()
        {
            return View( _context.Spellen.ToList());
        }

        // GET: Spel/Details/5
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var spel = _context.Spellen.FirstOrDefault(s => s.SpelId == id);
            if (spel == null)
            {
                return NotFound();
            }
            return View(spel);
        }

        // GET: Spel/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Spel/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Omschrijving,Token")] SpelModel spel)
        {
            if (ModelState.IsValid)
            {
                if (_context.Spellen.FirstOrDefault(s => s.Token.Equals(spel.Token)) == null)
                {
                    
                    
                    _context.Spellen.Add(spel);                    
                    await _context.SaveChangesAsync();
                    SpelerModel spelerFind = _context.Spelers.FirstOrDefault(s => s.Token.Equals(uM.GetUserId(User)));
                    spelerFind.SpelId = spel.SpelId;
                    spelerFind.Kleur = MVC_Tasker.Kleur.Zwart;
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Game","Home");
                }
            }
            return View(spel);
        }

        // GET: Spel/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var spel = await _context.Spellen.FindAsync(id);
            if (spel == null)
            {
                return NotFound();
            }
            return View(spel);
        }

        // POST: Spel/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("SpelId,Omschrijving,Token,BordJson,AanDeBeurt")] SpelModel spel)
        {
            if (id != spel.SpelId)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                try
                {                    
                    _context.Update(spel);
                    await _context.SaveChangesAsync();                    
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SpelExists(spel.SpelId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return NotFound();
        }

        // GET: Spel/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var spel = await _context.Spellen.FirstOrDefaultAsync(s => s.SpelId == id);
            if (spel == null)
            {
                return NotFound();
            }
            return View(spel);
        }

        // POST: Spel/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var spelers = _context.Spelers.Where(s=>s.SpelId.Equals(id)).ToList();
            foreach(SpelerModel s in spelers)
            {
                s.SpelId = null;
            }
            await _context.SaveChangesAsync();
            var spel = await _context.Spellen.FindAsync(id);
            _context.Spellen.Remove(spel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        private bool SpelExists(int id)
        {
            return _context.Spellen.Any(e => e.SpelId == id);
        }
    }
}