using System;
using System.Collections.Generic;
using System.Linq;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using KatvaSoft.Com.SimpleFeedback.Service.Dto;

namespace KatvaSoft.Com.SimpleFeedback.Service.Services
{
    public class ClientService
    {

        SfsDbContext _sfsDbContext;

        public ClientService(SfsDbContext sfsDbContext)
        {
            this._sfsDbContext = sfsDbContext;
        }

        public void RemoveClient(int clientAppId)
        {
            var client = this._sfsDbContext.ClientApps.Find(clientAppId);
            if(client != null)
            {
                this._sfsDbContext.ClientApps.Remove(client);
                this._sfsDbContext.SaveChanges();
            }
            
        }

        public List<ClientApp> ListClientApps()
        {
            return this._sfsDbContext.ClientApps.ToList();
        }

        public ClientApp SaveClientApp(ClientApp clientApp)
        {
            if(clientApp.ClientToken == null)
            {
                clientApp.ClientToken = Guid.NewGuid().ToString();
            }
            if(clientApp.ClientAppId == 0)
            {
                var savedEntity = this._sfsDbContext.ClientApps.Add(clientApp);
                this._sfsDbContext.SaveChanges();
                return savedEntity.Entity;
            } else
            {
                var savedEntity = this._sfsDbContext.ClientApps.Update(clientApp);
                this._sfsDbContext.SaveChanges();
                return savedEntity.Entity;
            }
        }

    }
}
