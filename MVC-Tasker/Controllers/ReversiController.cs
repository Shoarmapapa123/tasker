using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVC_Tasker.DAL;
using MVC_Tasker.Models;
using Microsoft.AspNetCore.Identity;
using MVC_Tasker;

namespace ReversiApp.Controllers
{
    [Route("api/[controller]")]
    /*[ApiController]*/
    public class ReversiController : ControllerBase
    {
        private readonly SpelContext _context;
        private readonly SpelModel _spel;
        private readonly UserManager<IdentityUser> uM;
        private readonly SpelerModel _speler;
        private IHttpContextAccessor _contextAccessor;
        private HttpContext _httpContext { get { return _contextAccessor.HttpContext; } }
        //constructor naar voorbeeld Thijs Notkamp
        public ReversiController(SpelContext context, IHttpContextAccessor contextAccessor, UserManager<IdentityUser> uMan)
        {
            _context = context;
            _contextAccessor = contextAccessor;
            uM = uMan;
            var userID = uM.GetUserId(_httpContext.User);
            _speler = _context.Spelers.FirstOrDefault(s => s.Token.Equals(userID));
            _spel = _context.Spellen.Find((_speler.SpelId));
        }

        //GET: api/Reversi/test
        [HttpGet]
        [Route("test2")]
        public ActionResult<string> GetTest2()
        {
            return $"Testing, your playername is {_speler.Naam}";
        }

        //GET: api/Reversi/test
        [HttpGet("test")]
        public ActionResult<string> GetTest()
        {
            return $"Testing, your playername is {_speler.Naam}";
        }   
        [HttpGet("leave")]
        public bool LeaveGame()
        {
            _spel.DeserializeBord();
            if (_spel.Afgelopen())
            {
                _speler.SpelId = null;
                _context.SaveChanges();
                return true;
            } else if (_context.Spelers.Where(s=>s.SpelId.Equals(_spel.SpelId)).Count().Equals(1))
            {
                _speler.SpelId = null;
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        [HttpGet("overwegendeKleur")]
        public ActionResult<Kleur> GetOverwegendeKleur()
        {
            _spel.DeserializeBord();
            return _spel.OverwegendeKleur();
        }
        [HttpGet("bord")]
        public ActionResult<string> GetBordJson()
        {            
            return _spel.BordJson;
        }
        [HttpGet("beurt")]
        public  ActionResult<Kleur> GetAanDeBeurt()
        {
            return _spel.AandeBeurt;
        }
        [HttpGet("{x}/{y}")]
        [Route("doezet")]
        public bool PostZet(int x, int y)
        {
            if (PlayersTurn())
            {
                _spel.DeserializeBord();
                bool returnval = _spel.DoeZet(x, y);
                _spel.SerializeBord();
                _context.SaveChanges();
                return returnval;
            }
            else 
            {
                return false;
            }
        }
        [HttpGet("opponent")]
        public ActionResult< string> GetNaamTegenstander()
        {
            try
            {
                SpelerModel opponent = _context.Spelers.FirstOrDefault(s => s.SpelId == _spel.SpelId && s.SpelerId != _speler.SpelerId);
                return opponent.Naam;
            }catch(NullReferenceException e)
            {
                return "Geen";
            }
        }

        [HttpGet("getfinish")]
        public bool GetFinish()
        {
            _spel.DeserializeBord();
            return _spel.Afgelopen();
        }

        [HttpGet("checkpass")]
        public ActionResult<bool> CheckPass()
        {
            _spel.DeserializeBord();
            return PlayersTurn()&&_spel.KanPassen();
        }

        [HttpGet("Pass")]
        public ActionResult<bool> Pass()
        {
            if (PlayersTurn())
            {
                _spel.DeserializeBord();
                bool x = _spel.Pas();
                _context.SaveChanges();
                return x;
            }
            else
            {
                return false;
            }
        }

        private bool PlayersTurn()
        {
            return _spel.AandeBeurt.Equals(_speler.Kleur);
        }
        private bool SpelModelExists(int id)
        {
            return _context.Spellen.Any(e => e.SpelId == id);
        }
    }
}
