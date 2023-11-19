import prismaClient from '../src/lib/prisma'

async function main() {
  const firstUserType = await prismaClient.userTypes.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      price: 0.0,
    },
  })

  console.log('Primeiro tipo de usuário criado', firstUserType)
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prismaClient.$disconnect()
  })
