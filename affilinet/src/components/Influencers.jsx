import {useState} from 'react'
const MELBET=0.35
const platColor={tiktok:'#3b82f6',instagram:'#f59e0b',youtube:'#ef4444',telegram:'#10b981'}
const inp = {width:'100%',padding:'7px 10px',fontSize:13,border:'1px solid #334155',borderRadius:8,background:'#0f0f1a',color:'#e2e8f0'}
const btn = (bg,c='#0f0f1a') => ({padding:'7px 16px',fontSize:13,cursor:'pointer',border:'none',borderRadius:8,background:bg,color:c,fontWeight:600})

export default function Influencers({influencers,setInfluencers}) {
  const [show,setShow]=useState(false)
  const [form,setForm]=useState({name:'',platform:'TikTok',clicks:'',regs:'',revenue:'',comm:'35'})
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))

  const add=()=>{
    if(!form.name.trim()) return
    setInfluencers(prev=>[...prev,{
      id:Date.now(),name:form.name,platform:form.platform,
      clicks:+form.clicks||0,regs:+form.regs||0,
      revenue:+form.revenue||0,comm:+form.comm||35,active:true
    }])
    setForm({name:'',platform:'TikTok',clicks:'',regs:'',revenue:'',comm:'35'})
    setShow(false)
  }

  const toggle=id=>setInfluencers(prev=>prev.map(i=>i.id===id?{...i,active:!i.active}:i))
  const remove=id=>setInfluencers(prev=>prev.filter(i=>i.id!==id))

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
        <span style={{fontSize:13,color:'#64748b'}}>{influencers.length} influenceri</span>
        <button style={btn('#00d4aa')} onClick={()=>setShow(s=>!s)}>+ Adaugă</button>
      </div>
      {show && (
        <div style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',padding:'1.25rem',marginBottom:'1rem'}}>
          <p style={{fontWeight:600,marginBottom:12}}>Influencer nou</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
            <div><div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Nume / @username</div><input style={inp} value={form.name} onChange={set('name')} placeholder="@username"/></div>
            <div><div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Platformă</div>
              <select style={inp} value={form.platform} onChange={set('platform')}>
                {['TikTok','Instagram','YouTube','Telegram'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div><div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Click-uri lunare</div><input style={inp} type="number" value={form.clicks} onChange={set('clicks')} placeholder="0"/></div>
            <div><div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Înregistrări</div><input style={inp} type="number" value={form.regs} onChange={set('regs')} placeholder="0"/></div>
            <div><div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Venit net generat ($)</div><input style={inp} type="number" value={form.revenue} onChange={set('revenue')} placeholder="0"/></div>
            <div><div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Comision influencer (%)</div><input style={inp} type="number" value={form.comm} onChange={set('comm')} placeholder="35"/></div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button style={btn('#00d4aa')} onClick={add}>Salvează</button>
            <button style={btn('#1e293b','#94a3b8')} onClick={()=>setShow(false)}>Anulează</button>
          </div>
        </div>
      )}
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {influencers.map(i=>{
          const pc=platColor[i.platform.toLowerCase()]||'#64748b'
          const n=i.revenue*MELBET - i.revenue*(i.comm/100)
          return (
            <div key={i.id} style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',padding:'1rem 1.25rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <span style={{fontWeight:600,fontSize:15}}>{i.name}</span>
                  <span style={{background:pc+'22',color:pc,padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{i.platform}</span>
                  <span style={{background:i.active?'#10b98122':'#64748b22',color:i.active?'#10b981':'#64748b',padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{i.active?'activ':'inactiv'}</span>
                </div>
                <div style={{fontSize:12,color:'#64748b',display:'flex',gap:16}}>
                  <span>{i.clicks.toLocaleString()} click-uri</span>
                  <span>{i.regs} înregistrări</span>
                  <span>Venit: ${i.revenue.toLocaleString()}</span>
                  <span>Comision: {i.comm}%</span>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:11,color:'#64748b'}}>Profit tău</div>
                  <div style={{fontSize:20,fontWeight:700,color:'#00d4aa'}}>${Math.round(n).toLocaleString()}</div>
                </div>
                <button style={btn(i.active?'#1e293b':'#00d4aa22',i.active?'#94a3b8':'#00d4aa')} onClick={()=>toggle(i.id)}>{i.active?'Dezactivează':'Activează'}</button>
                <button style={btn('#ef444422','#ef4444')} onClick={()=>remove(i.id)}>✕</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
