using MVC_Tasker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Tasker.DAL
{
    public class SeedData
    {
        public static void Initialize(SpelContext context)
        {
            context.Database.EnsureCreated();
                AddSpeler(context, new SpelerModel() { Naam = "Heinz", Kleur = Kleur.Zwart, Token = "123AD" }); ;
                AddSpeler(context, new SpelerModel() { Naam = "Frederik", Kleur = Kleur.Wit, Token = "123BD" });
                AddSpeler(context, new SpelerModel() { Naam = "Wilhelm", Kleur = Kleur.Zwart, Token = "123CD" });
                AddSpeler(context, new SpelerModel() { Naam = "Josephine", Kleur = Kleur.Geen, Token = "123DD" });
                AddSpeler(context, new SpelerModel() { Naam = "Josephine", Kleur = Kleur.Geen, Token = "1234DD"});
                AddSpeler(context, new SpelerModel() { Naam = "Josephine2", Kleur = Kleur.Geen, Token = "123DD"});
            AddSpel(context, new SpelModel() { Token = "33aabb", Omschrijving = "Een nieuw spel" });
            AddSpel(context, new SpelModel() { Token = "33aabbcc", Omschrijving = "Een nieuw spel2" });
            context.SaveChanges();          
        }
        private static void AddSpeler(SpelContext context,SpelerModel speler)
        {
            SpelerModel foundPlayer = context.Spelers.FirstOrDefault(s=>s.Naam.Equals(speler.Naam)||s.SpelerId.Equals(speler.SpelerId));
            if (foundPlayer ==null) { context.Spelers.Add(speler); }
        }
        private static void AddSpel(SpelContext context,SpelModel spel)
        {
            SpelModel foundSpel = context.Spellen.FirstOrDefault(s=>s.Token.Equals(spel.Token)||s.Omschrijving.Equals(spel.Omschrijving));
            if (foundSpel == null) { context.Spellen.Add(spel); }
        }
    }
}
