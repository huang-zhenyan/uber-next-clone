import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import tw from "tailwind-styled-components"
import Map from './components/map'
import Link from 'next/link'
import {auth} from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'


export default function Home() {

  // components = reusable ui element
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL
        })
       } else {
          setUser(null)
          router.push('/login')
      }
    })
  }, [])

  return (
    <Wrapper>
      <Map/>
      <ActionItems>
        {/* Header */}
        <Header>
          <UberLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"/>
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoUrl} onClick={()=> signOut(auth)}/>
          </Profile>
        </Header>
        {/* Action Buttons */}
        <ActionButtons>
          <Link href={{
            pathname: "/search",
            query: {
              ridetype: "car"
            }
          }}>
          <ActionButton>
            <ActionButtonImage src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_863,h_485/f_auto,q_auto/products/carousel/UberX.png" />
            Ride
          </ActionButton>
          </Link>
          
          <Link href={{
            pathname: "/search",
            query: {
              ridetype: "wheel"
            }
          }}>
          <ActionButton>
          <ActionButtonImage src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" />
            Wheels
          </ActionButton>
          </Link>

          <Link href="/reserve">
          <ActionButton>
          <ActionButtonImage src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" />
            Reserve
          </ActionButton>
          </Link>
          
        </ActionButtons>

        {/* Input Buttons*/}
        <InputButton>
          Where to?
        </InputButton>


      </ActionItems>
    </Wrapper>
  )
}

const Wrapper = tw.div`
  flex flex-col h-screen
`
const ActionItems = tw.div`
  flex-1 p-4
`

const Header = tw.div`
  flex justify-between items-center
`

const UberLogo = tw.img`
  h-28
`

const Profile = tw.div`
  flex items-center
`

const Name = tw.div`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer
`

const ActionButtons = tw.div`
  flex
`

const ActionButton = tw.div`
  flex bg-gray-200 flex-1 m-2 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl cursor-pointer
`

const ActionButtonImage = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8 m-2
`