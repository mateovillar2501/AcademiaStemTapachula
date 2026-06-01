using System.ComponentModel.DataAnnotations.Schema;
namespace AcademiaStemTapachula.Models
{
    [Table("cursos")]

    public class Cursos
    {

     public int Id { get; set; }
        public string nombre { get; set; }

        public string portada { get; set; }

        public string banner { get; set; }

        public bool estado { get; set; }

        public bool eliminado { get; set; }

        public DateTime created_at { get; set; }

        public DateTime updated_at { get; set; }




    }
}
