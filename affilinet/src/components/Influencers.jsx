import {useState} from 'react'
const MELBET=0.35
const platColor={tiktok:'#3b82f6',instagram:'#f59e0b',youtube:'#ef4444',telegram:'#10b981'}
const inp = {width:'100%',padding:'7px 10px',fontSize:13,border:'1px solid #334155',borderRadius:8,background:'#0f0f1a',color:'#e2e8f0'}
const btn = (bg,c='#0f0f1a') => ({padding:'7px 16px',fontSize:13,cursor:'pointer',border:'none',borderRadius:8,background:bg,color:c,fontWeight:600})

export default function Influencers({influencers,setInfluencers}) {
  const [show,setShow]=useState(false)
  const [copied,setCopied]=useState(null)
  const [form,setForm]=useState({name:'',platform:'TikTok',clicks:'',regs:'',revenue:'',comm:'35',promoCode:''})
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))

  const add=()=>{
    if(!form.name.trim()) return
    setInfluencers(prev=>[...prev,{
      id:Date.now(),name:form.name,platform:form.platform,
      clicks:+form.clicks||0,regs:+form.regs||0,
      revenue:+form.revenue||0,comm:+form.comm||35,
      promoCode:form.promoCode.toUpperCase(),active:true
    }])
    setForm({name:'',platform:'TikTok',clicks:'',regs:'',revenue:'',comm:'35',promoCode:''})
    setShow(false)
  }

  const toggle=id=>setInfluencers(prev=>prev.map(i=>i.id===id?{...i,active:!i.active}:i))
  const remove=id=>setInfluencers(prev=>prev.filter(i=>i.id!==id))

  const copyCode=(code,id)=>{
    navigator.clipboard.writeText(code).then(()=>{
      setCopied(id); setTimeout(()=>setCopied(null),2000)
    })
  }

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
            <div style={{gridColumn:'1/-1'}}>
              <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Promo cod <span style={{color:'#64748b',fontWeight:400}}>(ex: VLAD20, BEAUTY50)</span></div>
              <input style={inp} value={form.promoCode} onChange={set('promoCode')} placeholder="ex: VLAD20"/>
            </div>
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
            <div key={i.id} style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',padding:'1rem 1.25rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <span style={{fontWeight:600,fontSize:15}}>{i.name}</span>
                    <span style={{background:pc+'22',color:pc,padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{i.platform}</span>
                    <span style={{background:i.active?'#10b98122':'#64748b22',color:i.active?'#10b981':'#64748b',padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{i.active?'activ':'inactiv'}</span>
                  </div>
                  <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:10}}>
                    <span style={{fontSize:12,color:'#64748b'}}>{i.clicks.toLocaleString()} click-uri</span>
                    <span style={{fontSize:12,color:'#64748b'}}>{i.regs} înregistrări</span>
                    <span style={{fontSize:12,color:'#64748b'}}>Venit: ${i.revenue.toLocaleString()}</span>
                    <span style={{fontSize:12,color:'#64748b'}}>Comision: {i.comm}%</span>
                  </div>
                  {i.promoCode && (
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:12,color:'#64748b'}}>Promo cod:</span>
                      <span style={{background:'#00d4aa22',color:'#00d4aa',padding:'3px 12px',borderRadius:6,fontSize:13,fontWeight:700,fontFamily:'monospace',letterSpacing:'.05em'}}>{i.promoCode}</span>
                      <button onClick={()=>copyCode(i.promoCode,i.id)} style={{padding:'3px 10px',fontSize:11,cursor:'pointer',border:'1px solid #334155',borderRadius:6,background:'none',color:copied===i.id?'#00d4aa':'#64748b'}}>
                        {copied===i.id?'✓ Copiat':'Copiază'}
                      </button>
                    </div>
                  )}
                  {!i.promoCode && (
                    <span style={{fontSize:12,color:'#334155',fontStyle:'italic'}}>Fără promo cod</span>
                  )}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginLeft:16}}>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:11,color:'#64748b'}}>Profit tău</div>
                    <div style={{fontSize:20,fontWeight:700,color:'#00d4aa'}}>${Math.round(n).toLocaleString()}</div>
                  </div>
                  <button style={btn(i.active?'#1e293b':'#00d4aa22',i.active?'#94a3b8':'#00d4aa')} onClick={()=>toggle(i.id)}>{i.active?'Dezactivează':'Activează'}</button>
                  <button style={btn('#ef444422','#ef4444')} onClick={()=>remove(i.id)}>✕</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
