using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AcademiaStemTapachula.Data;
using AcademiaStemTapachula.Models;
using System.IO;
using System;

namespace AcademiaStemTapachula.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class CursosController : Controller
    {

        private readonly AppDbContext _context;

            public CursosController(AppDbContext context)
        {
            _context = context;
        }



        // GET: CursosController
        public ActionResult Index()
        {
            return View();  
        }
        

        public ActionResult NuevoCurso()
        {
            return View();
        }

        public ActionResult ListaCursos()
        {
            return View();
        }

        // GET: CursosController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CursosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CursosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CursosController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CursosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CursosController/Delete/5
        public ActionResult Delete(int id)
        {   
            return View();
        }

        // POST: CursosController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("Dashboard/Cursos/GuardarCurso")]
        public async Task<IActionResult> GuardarCurso(
    string NombreCurso,
    string CodigoHTML,
    IFormFile Imagen)
        {
            try
            {
                // VALIDAR IMAGEN
                if (Imagen == null || Imagen.Length == 0)
                {
                    return BadRequest(new
                    {
                        mensaje = "Debes seleccionar una imagen"
                    });
                }

                // EXTENSIONES PERMITIDAS
                string[] extensionesPermitidas =
                {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        };

                // OBTENER EXTENSIÓN
                var extension =
                    Path.GetExtension(Imagen.FileName)
                    .ToLower();

                // VALIDAR EXTENSIÓN
                if (!extensionesPermitidas.Contains(extension))
                {
                    return BadRequest(new
                    {
                        mensaje = "Formato no permitido"
                    });
                }

                // CREAR NOMBRE ÚNICO
                var nombreArchivo =
                    Guid.NewGuid().ToString() + extension;

                // RUTA DE LA CARPETA
                var rutaCarpeta = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "img"
                );

                // CREAR CARPETA SI NO EXISTE
                if (!Directory.Exists(rutaCarpeta))
                {
                    Directory.CreateDirectory(rutaCarpeta);
                }

                // RUTA COMPLETA
                var rutaCompleta = Path.Combine(
                    rutaCarpeta,
                    nombreArchivo
                );

                // GUARDAR IMAGEN
                using (var stream = new FileStream(
                    rutaCompleta,
                    FileMode.Create))
                {
                    await Imagen.CopyToAsync(stream);
                }

                // URL PARA LA BD
                var urlImagen =
                    "/img/" + nombreArchivo;

                // CREAR CURSO
                var curso = new Cursos
                {
                    nombre = NombreCurso,
                    banner = CodigoHTML,
                    portada = urlImagen,
                    estado = true,
                    eliminado = false,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now
                };

                // GUARDAR EN BD
                _context.Cursos.Add(curso);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    mensaje = "Curso guardado",
                    imagen = urlImagen
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = ex.ToString()
                });
            }
        }










    }
}
