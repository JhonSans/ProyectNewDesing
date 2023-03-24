using System;
using System.Collections.Generic;

namespace NorthwindTest.Models;

public partial class Territory
{
    public string TerritoryId { get; set; } = null!;

    public string TerritoryDescription { get; set; } = null!;

    public int RegionId { get; set; }

    [JsonIgnore]
    public virtual Region Region { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Employee> Employees { get; } = new List<Employee>();
}
