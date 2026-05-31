import {useState} from 'react'
const inp={width:'100%',padding:'7px 10px',fontSize:13,border:'1px solid #334155',borderRadius:8,background:'#0f0f1a',color:'#e2e8f0'}
const platColor={tiktok:'#3b82f6',instagram:'#f59e0b',youtube:'#ef4444',telegram:'#10b981'}

export default function Payments({influencers,payments,setPayments}) {
  const [show,setShow]=useState(false)
  const [form,setForm]=useState({infId:'',amount:'',note:''})
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))

  const add=()=>{
    if(!form.infId||!form.amount) return
    const inf=influencers.find(i=>i.id==form.infId)
    setPayments(prev=>[...prev,{
      id:Date.now(),infId:+form.infId,amount:+form.amount,
      note:form.note,name:inf?.name||'',platform:inf?.platform||'',
      date:new Date().toLocaleDateString('ro-RO')
    }])
    setForm({infId:'',amount:'',note:''})
    setShow(false)
  }

  const total=payments.reduce((s,p)=>s+p.amount,0)

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
        <span style={{fontSize:13,color:'#64748b'}}>Total plătit: <span style={{color:'#f59e0b',fontWeight:600}}>${total.toFixed(2)}</span></span>
        <button onClick={()=>setShow(s=>!s)} style={{padding:'7px 16px',fontSize:13,cursor:'pointer',border:'none',borderRadius:8,background:'#00d4aa',color:'#0f0f1a',fontWeight:600}}>+ Plată nouă</button>
      </div>
      {show && (
        <div style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',padding:'1.25rem',marginBottom:'1rem'}}>
          <p style={{fontWeight:600,marginBottom:12}}>Înregistrează plată</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
            <div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Influencer</div>
              <select style={inp} value={form.infId} onChange={set('infId')}>
                <option value="">Selectează...</option>
                {influencers.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Sumă ($)</div>
              <input style={inp} type="number" value={form.amount} onChange={set('amount')} placeholder="0"/>
            </div>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Notă</div>
            <input style={inp} value={form.note} onChange={set('note')} placeholder="ex: plată iulie 2026"/>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button style={{padding:'7px 16px',fontSize:13,cursor:'pointer',border:'none',borderRadius:8,background:'#00d4aa',color:'#0f0f1a',fontWeight:600}} onClick={add}>Salvează</button>
            <button style={{padding:'7px 16px',fontSize:13,cursor:'pointer',border:'1px solid #334155',borderRadius:8,background:'none',color:'#94a3b8'}} onClick={()=>setShow(false)}>Anulează</button>
          </div>
        </div>
      )}
      <div style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr>{['Data','Influencer','Platformă','Sumă','Notă'].map(h=>(
            <th key={h} style={{textAlign:'left',padding:'10px 14px',color:'#64748b',fontWeight:400,borderBottom:'1px solid #1e293b'}}>{h}</th>
          ))}</tr></thead>
          <tbody>
            {payments.length===0 && <tr><td colSpan={5} style={{padding:'24px',textAlign:'center',color:'#64748b'}}>Nicio plată înregistrată</td></tr>}
            {[...payments].reverse().map(p=>{
              const pc=platColor[p.platform?.toLowerCase()]||'#64748b'
              return <tr key={p.id}>
                <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#94a3b8'}}>{p.date}</td>
                <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a'}}>{p.name}</td>
                <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a'}}><span style={{background:pc+'22',color:pc,padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{p.platform}</span></td>
                <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#f59e0b',fontWeight:600}}>${p.amount.toFixed(2)}</td>
                <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#64748b'}}>{p.note}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
