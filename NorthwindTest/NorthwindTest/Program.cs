global using NorthwindTest.Models;
global using Microsoft.EntityFrameworkCore;
global using System.Text.Json.Serialization;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
var NorthwindOrigins = "_NorthwindOrigins";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
builder.Services.AddDbContext<NorthwindContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: NorthwindOrigins, policy =>
    {
        policy.WithOrigins("http://127.0.0.1:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(NorthwindOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
