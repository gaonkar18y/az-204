using System;
using System.Data.SqlClient;
using sqldemo.Models;

namespace sqldemo.Services
{
	public class ProductService
	{
		private static string db_source = "yogeshdb.database.windows.net";
        private static string db_user = "gaonkar18y";
        private static string db_pass = "G18@codemaster";
        private static string db_name = "appdb";

		private SqlConnection GetConnection()
		{
			var _builder = new SqlConnectionStringBuilder();
			_builder.DataSource = db_source;
            _builder.UserID = db_user;
			_builder.Password = db_pass;
			_builder.InitialCatalog = db_name;

			return new SqlConnection(_builder.ConnectionString);

        }

        public List<Product> GetProducts()
		{
            SqlConnection conn = this.GetConnection();

			List<Product> products_list = new List<Product>();

			string query = "select * from products";

			conn.Open();

			SqlCommand cmd = new SqlCommand(query, conn);

			using (SqlDataReader reader = cmd.ExecuteReader())
			{
				while (reader.Read())
				{
					Product p = new Product()
					{
						ProductId = reader.GetInt32(0),
						ProductName = reader.GetString(1),
						Quantity = reader.GetInt32(2)
					};

					products_list.Add(p);

				};

			}
			conn.Close();

			return products_list;
        }
	}
}

