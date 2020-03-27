using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MVC_Tasker.Models
{
    public class SpelModel
    {
        [Key]
        public int SpelId { get; set; }

        public string Omschrijving { get; set; }
        public string Token { get; set; }
        public ICollection<SpelerModel> Spelers { get; set; }
        
        [NotMapped]
        public Kleur[,] Bord { get; set; }
        public string BordJson { get; set; }
        public Kleur AandeBeurt { get; set; }

        public SpelModel()
        {
            //Initialize Board
            Bord = new Kleur[8, 8];
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    Bord[i, j] = Kleur.Geen;
                }
            }
            Bord[3, 3] = Kleur.Wit;
            Bord[4, 4] = Kleur.Wit;
            Bord[3, 4] = Kleur.Zwart;
            Bord[4, 3] = Kleur.Zwart;
            AandeBeurt = Kleur.Zwart;
            SerializeBord();
        }

        public bool Afgelopen()
        {
            bool afgelopen = false;
            if (Pas())
            {
                if (Pas())
                {
                    afgelopen = true;
                }
                else
                {
                    SpelerWissel();
                }
            }
            return afgelopen;
        }

        public bool DoeZet(int rijZet, int kolomZet)
        {
            if (ZetMogelijk(rijZet, kolomZet))
            {
                Bord[rijZet, kolomZet] = AandeBeurt;
                //naar https://github.com/barak03/reversi-game/blob/master/OtheloLogic.cs
                int rij;
                int kolom;
                for (int verschilRij = -1; verschilRij <= 1; verschilRij++)
                {
                    for (int verschilKolom = -1; verschilKolom <= 1; verschilKolom++)
                    {
                        if (!(verschilRij == 0 && verschilKolom == 0) && KanGewisseldWorden(rijZet, kolomZet, verschilRij, verschilKolom))
                        {
                            rij = rijZet + verschilRij;
                            kolom = kolomZet + verschilKolom;
                            while (!Bord[rij, kolom].Equals(AandeBeurt) && Bord[rij, kolom] != Kleur.Geen)
                            {
                                Bord[rij, kolom] = AandeBeurt;
                                rij += verschilRij;
                                kolom += verschilKolom;
                            }
                        }
                    }
                }
                SpelerWissel();
                return true;
            }
            else
            {
                return false;
            }            
        }

        public Kleur OverwegendeKleur()
        {
            int zwartCounter = 0;
            int witCounter = 0;
            foreach (Kleur k in Bord)
            {
                if (k.Equals(Kleur.Zwart))
                {
                    zwartCounter++;
                }
                else if (k.Equals(Kleur.Wit))
                {
                    witCounter++;
                }
            }
            if (zwartCounter > witCounter)
            {
                return Kleur.Zwart;
            }
            else if (witCounter > zwartCounter)
            {
                return Kleur.Wit;
            }
            else
            {
                return Kleur.Geen;
            }
        }

        public bool Pas()
        {
            bool kanPassen = KanPassen();
            if (kanPassen)
            {
                SpelerWissel();
            }
            return kanPassen;
        }

        public bool KanPassen()
        {
            bool kanPassen = true;
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    if (ZetMogelijk(i, j))
                    {
                        kanPassen = false;
                    }
                }
            }
            return kanPassen;
        }

        public bool ZetMogelijk(int rijZet, int kolomZet)
        {
            bool returnvalue = false;
            if (OpBord(rijZet, kolomZet))
            {
                if (Bord[rijZet, kolomZet].Equals(Kleur.Geen))
                {
                    for (int verschilRij = -1; verschilRij <= 1; verschilRij++)
                    {
                        for (int verschilKolom = -1; verschilKolom <= 1; verschilKolom++)
                        {
                            if (!(verschilRij == 0 && verschilKolom == 0) && KanGewisseldWorden(rijZet, kolomZet, verschilRij, verschilKolom))
                            {
                                returnvalue = true;
                            }
                        }
                    }
                }
            }
            return returnvalue;
        }
        //naar https://github.com/barak03/reversi-game/blob/master/OtheloLogic.cs
        public bool KanGewisseldWorden(int rijZet, int kolomZet, int verschilRij, int verschilKolom)
        {
            int rij = rijZet + verschilRij;
            int kolom = kolomZet + verschilKolom;
            bool returnValue = true;

            while (rij >= 0 && rij < 8 && kolom >= 0 && kolom < 8 && !Bord[rij, kolom].Equals(AandeBeurt) && Bord[rij, kolom] != Kleur.Geen)
            {
                rij += verschilRij;
                kolom += verschilKolom;
            }

            if (rij < 0 || rij >= 8 || kolom < 0 || kolom >= 8 || !Bord[rij, kolom].Equals(AandeBeurt) || ((rij - verschilRij == rijZet && kolom - verschilKolom == kolomZet) && (Bord[rij, kolom] != Kleur.Geen)))
            {
                returnValue = false;
            }

            return returnValue;
        }
        public bool OpBord(int rijZet, int kolomZet)
        {
            return (rijZet >= 0 && rijZet < 8 && kolomZet >= 0 && kolomZet < 8);
        }
        public void SpelerWissel()
        {
            if (AandeBeurt.Equals(Kleur.Zwart))
            {
                AandeBeurt = Kleur.Wit;
            }
            else
            {
                AandeBeurt = Kleur.Zwart;
            }
        }
        public void DeserializeBord()
        {
            Bord = JsonConvert.DeserializeObject<Kleur[,]>(BordJson);
        }
        public void SerializeBord()
        {
            BordJson = JsonConvert.SerializeObject(Bord);
        }
    }
}
