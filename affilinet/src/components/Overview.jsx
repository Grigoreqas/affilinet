const MELBET = 0.35
const plat = p => p.toLowerCase()
const platColor = {tiktok:'#3b82f6',instagram:'#f59e0b',youtube:'#ef4444',telegram:'#10b981'}

export default function Overview({influencers}) {
  let totalM=0,totalP=0,totalN=0,active=0
  influencers.forEach(i=>{
    const m=i.revenue*MELBET, p=i.revenue*(i.comm/100), n=m-p
    totalM+=m; totalP+=p; totalN+=n
    if(i.active) active++
  })
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:12,marginBottom:'1.5rem'}}>
        {[
          {l:'Câștig Melbet (35%)',v:'$'+Math.round(totalM).toLocaleString(),c:'#00d4aa'},
          {l:'Plătit influenceri',v:'$'+Math.round(totalP).toLocaleString(),c:'#f59e0b'},
          {l:'Profit net',v:'$'+Math.round(totalN).toLocaleString(),c:'#00d4aa'},
          {l:'Influenceri activi',v:active,c:'#3b82f6'},
        ].map(k=>(
          <div key={k.l} style={{background:'#1a1a2e',borderRadius:10,padding:'1rem',border:'1px solid #1e293b'}}>
            <div style={{fontSize:11,color:'#64748b',marginBottom:6,textTransform:'uppercase',letterSpacing:'.05em'}}>{k.l}</div>
            <div style={{fontSize:24,fontWeight:700,color:k.c}}>{k.v}</div>
          </div>
        ))}
      </div>
      <div style={{background:'#1a1a2e',borderRadius:12,border:'1px solid #1e293b',overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr>{['Nume','Platformă','Click-uri','Înregistrări','Venit net','Profit tău'].map(h=>(
            <th key={h} style={{textAlign:'left',padding:'10px 14px',color:'#64748b',fontWeight:400,borderBottom:'1px solid #1e293b'}}>{h}</th>
          ))}</tr></thead>
          <tbody>{influencers.map(i=>{
            const n=i.revenue*MELBET - i.revenue*(i.comm/100)
            const pc=platColor[plat(i.platform)]||'#64748b'
            return <tr key={i.id}>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a'}}>{i.name}</td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a'}}><span style={{background:pc+'22',color:pc,padding:'2px 8px',borderRadius:6,fontSize:11,fontWeight:600}}>{i.platform}</span></td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#94a3b8'}}>{i.clicks.toLocaleString()}</td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#94a3b8'}}>{i.regs}</td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#94a3b8'}}>${i.revenue.toLocaleString()}</td>
              <td style={{padding:'10px 14px',borderBottom:'1px solid #0f172a',color:'#00d4aa',fontWeight:600}}>${Math.round(n).toLocaleString()}</td>
            </tr>
          })}</tbody>
        </table>
      </div>
    </div>
  )
}
