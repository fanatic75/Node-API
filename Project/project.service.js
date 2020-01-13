const sequelize = require("../helpers/db");
const Clients = sequelize.import("../models/clients");
const Projects = sequelize.import("../models/projects");
const Costs = sequelize.import("../models/costs");
const CostTypes = sequelize.import("../models/cost_types");



//clients has many projects
Clients.hasMany(Projects, { as: "Breakdown", foreignKey: "Client_ID" });


//project has 1 one client
Projects.belongsTo(Clients, { foreignKey: "Client_ID" });




//Project is linked to Cost Types through a relationship Costs 
// Here Project has many Cost Types and it uses costs as the relationship table


Projects.belongsToMany(CostTypes, {
  through: {
    model: Costs,

    as: "Breakdown"
  },

  foreignKey: "Project_ID"
});



//Cost Types also has many Projects since it's a m:n relationship. It is also linked to Projects via Costs.

CostTypes.belongsToMany(Projects, {
  through: {
    model: Costs
  },

  foreignKey: "Cost_Type_ID"
});


//Cost types has many costs, required for getting the amount later for every property.
CostTypes.hasMany(Costs, {
  foreignKey: "Cost_Type_ID"
});

//Projects also has many costs, again required for finding out the amount later for every property but it's not really coming up. 
//This is a working step.
Projects.hasMany(Costs, {
  foreignKey: "Project_ID"
});


//Self relation of Cost Type with itself.

CostTypes.hasMany(CostTypes, {
  foreignKey: "Parent_Cost_Type_ID"
});



//route function of Getting all the details. Returns a JSON Array Object.
const getCostOfAllClients = async query => {
  if (!Object.keys(query).length) {
    const clients = await Clients.findAll({
      include: [
        {
          model: Projects,
          as: "Breakdown",

          attributes: {
            include: [
              ["ID", "id"],
              ["Title", "Name"]
            ],
            exclude: ["Client_ID", "ID", "Title"]
          },
          include: [{
            model:Costs,
            group:['ID']
          },
            {
              model: CostTypes,
              through: {
                model: Costs,
                attributes: {
                  exclude: ["ID", "Cost_Type_ID", "Project_ID"]
                }
              },
              attributes: {
                exclude: ["Parent_Cost_Type_ID"]
              },
              where: {
                Parent_Cost_Type_ID: null
              },
              include: {
                model: CostTypes,
                attributes: {
                  exclude: ["Parent_Cost_Type_ID"]
                }
              }
             
            }
          ]
        }
      ]
    });
    

    //getting the amount with raw sql query and adding it to the clients object for each client.
    const result = await sequelize.query(
      ` select sum(amount) as amount  from clients c, projects p , costs cs where c.id = p.client_id  and p.id = cs.project_id and cs.cost_type_id<4 group by c.id; `
    );

    const parsedClients = JSON.parse(JSON.stringify(clients));
    parsedClients.forEach((client, i) => {
      client.amount = result[0][i]["amount"];
    });
    return parsedClients;
  } else {

    //query request 
      if(query.clients&&query.projects&&query.cost_types){
        const clients = await Clients.findAll({
            where: {
              ID: query.clients
            },
            include: [
              {
                model: Projects,
                as: "Breakdown",
                where: {
                  ID: query.projects
                },
                attributes: {
                  include: [
                    ["ID", "id"],
                    ["Title", "Name"]
                  ],
                  exclude: ["Client_ID", "ID", "Title"]
                },
                include: [
                  {
                    model: CostTypes,
                    through: {
                      model: Costs,
                      attributes: {
                        exclude: ["ID", "Cost_Type_ID", "Project_ID"]
                      }
                    },
                    attributes: {
                      exclude: ["Parent_Cost_Type_ID"]
                    },
                    where: {
                      Parent_Cost_Type_ID: null,
                      ID:query.cost_types
                    },
                    include: {
                      model: CostTypes,
                      attributes: {
                        exclude: ["Parent_Cost_Type_ID"]
                      }
                    }
                  }
                ]
              }
            ]
          });
    
          return clients;
      }
    else if (query.clients && query.projects) {
      const clients = await Clients.findAll({
        where: {
          ID: query.clients
        },
        include: [
          {
            model: Projects,
            as: "Breakdown",
            where: {
              ID: query.projects
            },
            attributes: {
              include: [
                ["ID", "id"],
                ["Title", "Name"]
              ],
              exclude: ["Client_ID", "ID", "Title"]
            },
            include: [
              {
                model: CostTypes,
                through: {
                  model: Costs,
                  attributes: {
                    exclude: ["ID", "Cost_Type_ID", "Project_ID"]
                  }
                },
                attributes: {
                  exclude: ["Parent_Cost_Type_ID"]
                },
                where: {
                  Parent_Cost_Type_ID: null
                },
                include: {
                  model: CostTypes,
                  attributes: {
                    exclude: ["Parent_Cost_Type_ID"]
                  }
                }
              }
            ]
          }
        ]
      });

      return clients;
    } 
    
    else if(query.cost_types){
        const clients = await Clients.findAll({
            include: [
              {
                model: Projects,
                as: "Breakdown",
      
                attributes: {
                  include: [
                    ["ID", "id"],
                    ["Title", "Name"]
                  ],
                  exclude: ["Client_ID", "ID", "Title"]
                },
                include: [
                  {
                    model: CostTypes,
                    through: {
                      model: Costs,
                      attributes: {
                        exclude: ["ID", "Cost_Type_ID", "Project_ID"]
                      }
                    },
                    attributes: {
                      exclude: ["Parent_Cost_Type_ID"]
                    },
                    where: {
                      Parent_Cost_Type_ID: null,
                      ID:query.cost_types
                    },
                    include: {
                      model: CostTypes,
                      attributes: {
                        exclude: ["Parent_Cost_Type_ID"]
                      }
                    }
                   
                  }
                ]
              }
            ]
          });
          return clients;
    }
    
    else if (query.clients) {
      const clients = await Clients.findAll({
        where: {
          ID: query.clients
        },
        include: [
          {
            model: Projects,
            as: "Breakdown",

            attributes: {
              include: [
                ["ID", "id"],
                ["Title", "Name"]
              ],
              exclude: ["Client_ID", "ID", "Title"]
            },
            include: [
              {
                model: CostTypes,
                through: {
                  model: Costs,
                  attributes: {
                    exclude: ["ID", "Cost_Type_ID", "Project_ID"]
                  }
                },
                attributes: {
                  exclude: ["Parent_Cost_Type_ID"]
                },
                where: {
                  Parent_Cost_Type_ID: null
                },
                include: {
                  model: CostTypes,
                  attributes: {
                    exclude: ["Parent_Cost_Type_ID"]
                  }
                }
              }
            ]
          }
        ]
      });

      return clients;
    }
    else{
      return false;
    }
  }
};

module.exports = {
  getCostOfAllClients
};
