import {useState} from 'react'
const BASE='https://melbet.com/ref/'
const inp={width:'100%',padding:'7px 10px',fontSize:13,border:'1px solid #334155',borderRadius:8,background:'#0f0f1a',color:'#e2e8f0'}
const platColor={tiktok:'#3b82f6',instagram:'#f59e0b',youtube:'#ef4444',telegram:'#10b981'}

export default function Links({influencers}) {
  const [selId,setSelId]=useState(influencers[0]?.id||'')
  const [camp,setCamp]=useState('general')
  const [copied,setCopied]=useState(false)

  const inf=influencers.find(i=>i.id==selId)
  const subid=inf?'INF'+inf.id+'_'+camp:''
  const link=BASE+subid

  const copy=()=>{
    navigator.clipboard.writeText(link).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)})
  }

  return (
    <div>
      <div style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',padding:'1.25rem',marginBottom:'1rem'}}>
        <p style={{fontWeight:600,marginBottom:12}}>Generează link de tracking</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
          <div>
            <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Influencer</div>
            <select style={inp} value={selId} onChange={e=>setSelId(e.target.value)}>
              {influencers.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Campanie</div>
            <input style={inp} value={camp} onChange={e=>setCamp(e.target.value)} placeholder="ex: iunie2026"/>
          </div>
        </div>
        <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Link generat</div>
        <div style={{background:'#0f0f1a',borderRadius:8,padding:'10px 12px',fontFamily:'monospace',fontSize:12,color:'#00d4aa',marginBottom:8,wordBreak:'break-all'}}>{link}</div>
        <button onClick={copy} style={{padding:'7px 16px',fontSize:13,cursor:'pointer',border:'1px solid #334155',borderRadius:8,background:'none',color:copied?'#00d4aa':'#94a3b8',fontWeight:600}}>
          {copied?'✓ Copiat!':'Copiază linkul'}
        </button>
      </div>
      <div style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',overflow:'auto'}}>
        <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #1e293b',fontWeight:600,fontSize:14}}>Toate linkurile active</div>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr>{['Influencer','Platformă','SubID','Link Melbet'].map(h=>(
            <th key={h} style={{textAlign:'left',padding:'10px 14px',color:'#64748b',fontWeight:400,borderBottom:'1px solid #1e293b'}}>{h}</th>
          ))}</tr></thead>
          <tbody>{influencers.filter(i=>i.active).map(i=>{
            const pc=platColor[i.platform.toLowerCase()]||'#64748b'
            const sid='INF'+i.id
            return <tr key={i.id}>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a'}}>{i.name}</td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a'}}><span style={{background:pc+'22',color:pc,padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{i.platform}</span></td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',fontFamily:'monospace',color:'#94a3b8'}}>{sid}</td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',fontFamily:'monospace',fontSize:11,color:'#64748b'}}>{BASE+sid}</td>
            </tr>
          })}</tbody>
        </table>
      </div>
    </div>
  )
}
