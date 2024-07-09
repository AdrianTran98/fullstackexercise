import NavBar from '../components/NavBar'
import PatientsDisplay from '../components/PatientsDisplay'

const Home = () => {
  return (
    <>
        <div className='bg-slate-500 w-screen h-lvh grid place-items-center'>
            <div className='w-[min(1200px,100%-12rem)] mx-auto flex flex-col gap-3'>
                <NavBar />
                <PatientsDisplay />
            </div>
        </div>
    </>
  )
}

export default Home
