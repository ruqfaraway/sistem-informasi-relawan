import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPositions = [
 {
  position: 'KOMANDAN',
  code: 'komandan',
 },
 {
  position: 'WAKIL KOMANDAN',
  code: 'wakil-komandan',
 },
 {
  position: 'ANGGOTA',
  code: 'anggota',
 },
 {
  position: 'PENGURUS',
  code: 'pengurus',
 }
]

const initialReligions = [
 {
  religion: 'ISLAM',
  code: 'islam',
 },
 {
  religion: 'KRISTEN',
  code: 'kristen',
 },
 {
  religion: 'KATOLIK',
  code: 'katolik',
 },
 {
  religion: 'HINDU',
  code: 'hindu',
 },
 {
  religion: 'BUDHA',
  code: 'budha',
 },
 {
  religion: 'KONGHUCU',
  code: 'konghucu',
 },
 {
  religion: 'LAINNYA',
  code: 'lainnya',
 }
]

const initialVolunteerTypes = [
 {
  volunteer_type: 'KSR',
  code: 'ksr',
 },
 {
  volunteer_type: 'TSR',
  code: 'tsr',
 },
 {
  volunteer_type: 'SIBAT',
  code: 'sibat',
 },
]

const initialRoles = [
 {
  role_name: 'super-admin'
 },
 {
  role_name: 'user-admin'
 }
]

const initialEducations = [
 {
  education: 'SD',
  code: 'sd',
 },
 {
  education: 'SMP',
  code: 'smp',
 },
 {
  education: 'SMA',
  code: 'sma',
 },
 {
  education: 'D3',
  code: 'd3',
 },
 {
  education: 'S1',
  code: 's1',
 },
 {
  education: 'S2',
  code: 's2',
 },
 {
  education: 'S3',
  code: 's3',
 }
]

const initialOccupations = [
 {
  occupation: 'PNS',
  code: 'pns',
 },
 {
  occupation: 'WIRASWASTA',
  code: 'wiraswasta',
 },
 {
  occupation: 'SWASTA',
  code: 'swasta',
 },
 {
  occupation: 'GURU',
  code: 'guru',
 },
 {
  occupation: 'MAHASISWA',
  code: 'mahasiswa',
 }
]
async function main() {
 const roles = initialRoles.map(async (role) => {
  return await prisma.role.create({
   data: role
  })
 })
 const positions = initialPositions.map(async (position) => {
  return await prisma.position.create({
   data: position
  })
 })
 const religions = initialReligions.map(async (religion) => {
  return await prisma.religion.create({
   data: religion
  })
 })
 const volunteerTypes = initialVolunteerTypes.map(async (volunteerType) => {
  return await prisma.volunteerType.create({
   data: volunteerType
  })
 })
 const educations = initialEducations.map(async (education) => {
  return await prisma.educationLevel.create({
   data: education
  })
 })
 const occupations = initialOccupations.map(async (occupation) => {
  return await prisma.occupation.create({
   data: occupation
  })
 })
 await Promise.all(positions)
 await Promise.all(occupations)
 await Promise.all(educations)
 await Promise.all(religions)
 await Promise.all(volunteerTypes)
 await Promise.all(roles)
 console.log('Seed successfull')
}
main()
 .then(async () => {
  await prisma.$disconnect()
 })
 .catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
 })