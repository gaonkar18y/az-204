using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using sqldemo.Models;
using sqldemo.Services;

namespace sqldemo.Pages;

public class IndexModel : PageModel
{
    public List<Product> products_list;
    public void OnGet()
    {
        ProductService service = new ProductService();
        products_list = service.GetProducts();
    }
}

