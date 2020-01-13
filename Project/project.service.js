const sequelize = require("../helpers/db");
const { Op } = require("sequelize");
const mysql = require("mysql");
const Clients = sequelize.import("../models/clients");
const Projects = sequelize.import("../models/projects");
const Costs = sequelize.import("../models/costs");
const CostTypes = sequelize.import("../models/cost_types");
Clients.hasMany(Projects, { as: "Breakdown", foreignKey: "Client_ID" });
Projects.belongsTo(Clients, { foreignKey: "Client_ID" });
Projects.belongsToMany(CostTypes, {
  through: {
    model: Costs,

    as: "Breakdown"
  },

  foreignKey: "Project_ID"
});

CostTypes.belongsToMany(Projects, {
  through: {
    model: Costs
  },

  foreignKey: "Cost_Type_ID"
});
CostTypes.hasMany(Costs, {
  foreignKey: "Cost_Type_ID"
});

Projects.hasMany(Costs, {
  foreignKey: "Project_ID"
});

CostTypes.hasMany(CostTypes, {
  foreignKey: "Parent_Cost_Type_ID"
});
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
    const result = await sequelize.query(
      ` select sum(amount) as amount  from clients c, projects p , costs cs where c.id = p.client_id  and p.id = cs.project_id and cs.cost_type_id<4 group by c.id; `
    );

    const parsedClients = JSON.parse(JSON.stringify(clients));
    parsedClients.forEach((client, i) => {
      client.amount = result[0][i]["amount"];
    });
    console.log(parsedClients);
    return parsedClients;
  } else {
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
