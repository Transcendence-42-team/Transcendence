import { extendType, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  
import { PrismaPromise } from "@prisma/client";



export const Link = objectType({
    name: "Link", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5 
    },
});



export const LinkQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   // 3
            type: "Link",
            resolve(parent, args, context) {    // 4
				return context.prisma.link.findMany();
			},
        });
    },
});


export const test = extendType({
	type: 'Query',
	definition(t) {
	  t.list.field('fee', {
		type: 'Link',
		args: {
		//   id: nonNull('Int'),
		  descr: nonNull('String'),
		},
		resolve(parent, args, context){
		  const { descr } = args;
		  return context.prisma.link.findMany({
			where: {
			  description: descr,
			},
		  });
		},
	  });
	},
  });



// {
// 	Query: {
// 	  link: async (parent, args, context) => {
// 		const { id } = args;
// 		// Utilisez Prisma Client pour récupérer le lien correspondant à partir de la base de données
// 		const link = await context.prisma.link.findUnique({
// 		  where: {
// 			id: parseInt(id), // Assurez-vous de convertir l'ID en un type compatible avec la colonne de la base de données
// 		  },
// 		});
// 		return link;
// 	  },
// 	}
//   }


export const LinkMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Link",  
            args: {   // 3
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
				return context.prisma.link.create({
					data: {
						description: args.description,
						url: args.url,
					}
				});
			},
        });
    },
});

