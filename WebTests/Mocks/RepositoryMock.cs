using Battleships.Core.Contracts;
using Battleships.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebTests.Mocks
{
	public class RepositoryMock<T> : IRepository<T> where T : BaseEntity
	{
		List<T> items;
		string className;

		public RepositoryMock()
		{
			className = typeof(T).Name;

			items = new List<T>();
		}

		public void Commit()
		{
			return;
		}

		public void Insert(T t)
		{
			items.Add(t);
		}

		public void Update(T t)
		{
			T itemToUpdate = items.Find(i => i.Id == t.Id);

			if (itemToUpdate != null) itemToUpdate = t;
			else throw new Exception(className + "not found");
		}

		public T Find(string Id)
		{
			T item = items.Find(i => i.Id == Id);
			if (item != null) return item;
			else return null;
		}
		public void Delete(string Id)
		{
			T itemToDelete = items.Find(i => i.Id == Id);
			if (itemToDelete != null) items.Remove(itemToDelete);
			else throw new Exception(className + "not found");
		}

		public IQueryable<T> Collection()
		{
			return items.AsQueryable();
		}
	}
}
