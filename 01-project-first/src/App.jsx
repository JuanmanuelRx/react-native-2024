import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  { username: 'withastro', name: 'AstroDev' ,  isFollowing: true },
  { username: 'nextjs', name: 'Next.js', isFollowing: false },
  { username: 'twbs', name: 'Bootstrap5', isFollowing: true },
  { username: 'JavaScriptDaily', name: 'JavaScript', isFollowing: false },
]

export function App() {
  return (
    <section className='App'>
      {
        users.map(user => {
          const { username, name, isFollowing } = user
          return (
            <TwitterFollowCard key={username} username={username} initialIsFollowing={isFollowing}>
              {name}
            </TwitterFollowCard>
          )
        })
      }
    </section>
    
  )
}