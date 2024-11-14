using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Net;
namespace EnableX
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var ipAddress = GetLocalIPAddress();
            CreateHostBuilder(args, ipAddress).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args, string ipAddress) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseUrls($"https://{ipAddress}:44306");
                    webBuilder.UseStartup<Startup>();
                });
        private static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    return ip.ToString(); 
                }
            }
            return "127.0.0.1"; 
        }
    }
}
