import {useState,useMemo} from "react"
import {
Container,
Card,
CardContent,
Typography,
TextField,
MenuItem,
Checkbox,
FormControlLabel,
Button,
LinearProgress,
Snackbar,
Alert,
Box
} from "@mui/material"

function App(){

const[form,setForm]=useState({
name:"",
email:"",
role:"",
experience:"",
topics:[],
goals:""
})

const[open,setOpen]=useState(false)

const handleChange=(e)=>{
const{name,value}=e.target
setForm({...form,[name]:value})
}

const handleTopics=(topic)=>{
setForm(prev=>{
const exists=prev.topics.includes(topic)
return{
...prev,
topics:exists
?prev.topics.filter(t=>t!==topic)
:[...prev.topics,topic]
}
})
}

const progress=useMemo(()=>{
let filled=0
Object.values(form).forEach(v=>{
if(Array.isArray(v)&&v.length>0)filled++
else if(v!=="")filled++
})
return Math.min((filled/6)*100,100)
},[form])

const handleSubmit=(e)=>{
e.preventDefault()
setOpen(true)
}

return(
<div style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#e3f2fd,#e1bee7)",
display:"flex",
alignItems:"center"
}}>

<Container maxWidth="md">
<Card sx={{borderRadius:4,boxShadow:10}}>
<CardContent>

<div className="d-flex justify-content-between align-items-center mb-4">
<div>
<Typography variant="h5" fontWeight="bold">
Frontend Intake Form
</Typography>
<Typography variant="body2" color="text.secondary">
Fully controlled using React state
</Typography>
</div>
<Box sx={{width:150}}>
<Typography variant="body2" align="right">
Progress {Math.round(progress)}%
</Typography>
<LinearProgress
variant="determinate"
value={progress}
sx={{height:8,borderRadius:5}}
/>
</Box>
</div>

<form onSubmit={handleSubmit}>

<div className="row g-3">

<div className="col-md-6">
<TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange}/>
</div>

<div className="col-md-6">
<TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange}/>
</div>

<div className="col-md-6">
<TextField select fullWidth label="Role" name="role" value={form.role} onChange={handleChange}>
<MenuItem value="Developer">Developer</MenuItem>
<MenuItem value="Designer">Designer</MenuItem>
<MenuItem value="Student">Student</MenuItem>
</TextField>
</div>

<div className="col-md-6">
<TextField select fullWidth label="Experience" name="experience" value={form.experience} onChange={handleChange}>
<MenuItem value="0-1 years">0-1 years</MenuItem>
<MenuItem value="1-3 years">1-3 years</MenuItem>
<MenuItem value="3+ years">3+ years</MenuItem>
</TextField>
</div>

</div>

<Box mt={3}>
<Typography variant="subtitle1" fontWeight="medium">
Topics to focus on
</Typography>
<FormControlLabel control={<Checkbox checked={form.topics.includes("Hooks")} onChange={()=>handleTopics("Hooks")}/>} label="Hooks"/>
<FormControlLabel control={<Checkbox checked={form.topics.includes("Routing")} onChange={()=>handleTopics("Routing")}/>} label="Routing"/>
<FormControlLabel control={<Checkbox checked={form.topics.includes("Testing")} onChange={()=>handleTopics("Testing")}/>} label="Testing"/>
</Box>

<Box mt={3}>
<TextField fullWidth multiline rows={3} label="Goals" name="goals" value={form.goals} onChange={handleChange}/>
</Box>

<Box mt={4} textAlign="center">
<Button
type="submit"
variant="contained"
size="large"
sx={{
px:6,
borderRadius:3,
transition:"0.3s",
"&:hover":{transform:"scale(1.05)"}
}}
>
Save Preferences
</Button>
</Box>

</form>

{/* ✅ SIMPLE CLEAN LIVE PREVIEW */}

<Box mt={4} p={3} bgcolor="#f8f9fa" borderRadius={3}>
<Typography variant="h6" fontWeight="bold" gutterBottom>
Live Preview
</Typography>

<Typography><strong>Name:</strong> {form.name || "—"}</Typography>
<Typography><strong>Email:</strong> {form.email || "—"}</Typography>
<Typography><strong>Role:</strong> {form.role || "—"}</Typography>
<Typography><strong>Experience:</strong> {form.experience || "—"}</Typography>

<Typography>
<strong>Topics:</strong>{" "}
{form.topics.length>0 ? form.topics.join(", ") : "—"}
</Typography>

<Typography mt={1}>
<strong>Goals:</strong><br/>
{form.goals || "—"}
</Typography>
</Box>

</CardContent>
</Card>
</Container>

<Snackbar open={open} autoHideDuration={3000} onClose={()=>setOpen(false)}>
<Alert severity="success" variant="filled">
Preferences saved successfully 🚀
</Alert>
</Snackbar>

</div>
)
}

export default App