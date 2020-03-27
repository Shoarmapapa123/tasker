using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MVC_Tasker.DAL;
using MVC_Tasker.Models;

namespace ReversiApp.Controllers    
{
    [Authorize]
    public class SpelerController : Controller
    {
        private readonly SpelContext _context;
        private UserManager<IdentityUser> uM;

        public SpelerController(SpelContext context, UserManager<IdentityUser> userManager) { _context = context;uM = userManager; }        
        // GET: Speler
        public IActionResult Index()
        {
            return View(_context.Spelers.ToList());
        }
        // GET: Speler/Details/5
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var speler = _context.Spelers.FirstOrDefault(s => s.SpelerId == id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }

        // GET: Speler/Create
        public IActionResult Create()
        {
            FillViewBag();
            return View();
        }

        // POST: Speler/Create
        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> Create([Bind("Naam,Kleur,SpelId")] SpelerModel speler)
        {
            
            if (ModelState.IsValid)
            {
                speler.Token = uM.GetUserId(User);
                if (!speler.Token.Equals(null)||_context.Spelers.FirstOrDefault(s=>s.Token.Equals(speler.Token))!=null) { 
                    _context.Add(speler);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index)); }
            }
            return View(speler);
        }

        // GET: Speler/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            FillViewBag();
            if (id == null)
            {
                return NotFound();
            }
            var speler = await _context.Spelers.FindAsync(id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }

        // POST: Speler/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id,[Bind("Id,Naam,Token,Kleur,SpelId")] SpelerModel speler)
        {
            if (id != speler.SpelerId)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                SpelModel gevondenspel = _context.Spellen.FirstOrDefault(s => s.SpelId.Equals(speler.SpelId));
                if (gevondenspel.Spelers.FirstOrDefault(s => s.SpelerId == speler.SpelerId) != null || gevondenspel.Spelers.Count < 2)
                {
                    try
                    {
                        _context.Update(speler);
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!SpelerExists(speler.SpelerId))
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
            }
            return NotFound();    
        }

        // GET: Speler/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var speler = await _context.Spelers.FirstOrDefaultAsync(s => s.SpelerId == id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }

        // POST: Speler/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var speler = await _context.Spelers.FindAsync(id);
            _context.Spelers.Remove(speler);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        private bool SpelerExists(int id)
        {
            return _context.Spelers.Any(e => e.SpelerId == id);
        }
        private void FillViewBag()
        {
            var lI = new List<int>();
            foreach(SpelModel s in _context.Spellen)
            {
                lI.Add(s.SpelId);
            }
            ViewBag.SpelId = new SelectList(lI);
        }
    }
}