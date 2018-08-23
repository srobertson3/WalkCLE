﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Web.Models;

namespace WebApplication.Web.DAL
{
    public interface IBadgeSqlDAL
    {
        IList<Badge> GetUserBadges(int userId);
		IList<Badge> GetAllBadges();

        bool GiveUserBadges(int userId);
    }
}
