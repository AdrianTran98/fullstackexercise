import VBrLogo from '../assets/logo/VBr Full.png'
const NavBar = () => {
  return (
    <div className='bg-slate-50 flex flex-row gap-5 p-3 ring-1 ring-black'>
      <div><img src={VBrLogo} alt="VinBrain Logo" width={30} height={30}/></div>
      <div>VINBRAIN</div>
    </div>
  )
}

export default NavBar
