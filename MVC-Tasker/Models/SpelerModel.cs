using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MVC_Tasker.Models
{
    public class SpelerModel
    {
        [Key]
        public int SpelerId { get; set; }
        public string Naam { get; set; }
        public string Token { get; set; }
        public Kleur Kleur { get; set; }
        [ForeignKey("SpelId")]
        public int? SpelId { get; set; }
        public SpelModel Spel {get; set;}

    }
}
