import { useState } from 'react'
import Overview from './components/Overview.jsx'
import Influencers from './components/Influencers.jsx'
import Links from './components/Links.jsx'
import Payments from './components/Payments.jsx'

const TABS = ['Overview','Influenceri','Linkuri','Plăți']

const initInfluencers = [
  {id:1,name:'@moldovan_vlad',platform:'TikTok',clicks:3200,regs:48,revenue:1800,comm:35,active:true},
  {id:2,name:'@beauty_md',platform:'Instagram',clicks:1900,regs:31,revenue:1100,comm:30,active:true},
  {id:3,name:'@gaming_ro',platform:'YouTube',clicks:4100,regs:62,revenue:2400,comm:40,active:true},
  {id:4,name:'@stiri_md',platform:'Telegram',clicks:800,regs:9,revenue:280,comm:30,active:false},
]

export default function App() {
  const [tab, setTab] = useState(0)
  const [influencers, setInfluencers] = useState(initInfluencers)
  const [payments, setPayments] = useState([])

  const props = { influencers, setInfluencers, payments, setPayments }

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:'2rem 1.5rem'}}>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:24,fontWeight:700,color:'#00d4aa',marginBottom:4}}>AffiliNet</h1>
        <p style={{fontSize:13,color:'#64748b'}}>Management afilieri casino — Melbet</p>
      </div>
      <div style={{display:'flex',gap:4,borderBottom:'1px solid #1e293b',marginBottom:'1.5rem'}}>
        {TABS.map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{
            padding:'8px 18px',fontSize:14,cursor:'pointer',border:'none',
            background:'none',color:tab===i?'#00d4aa':'#64748b',
            borderBottom:tab===i?'2px solid #00d4aa':'2px solid transparent',
            marginBottom:-1,fontWeight:tab===i?600:400,transition:'color .15s'
          }}>{t}</button>
        ))}
      </div>
      {tab===0 && <Overview {...props}/>}
      {tab===1 && <Influencers {...props}/>}
      {tab===2 && <Links {...props}/>}
      {tab===3 && <Payments {...props}/>}
    </div>
  )
}
