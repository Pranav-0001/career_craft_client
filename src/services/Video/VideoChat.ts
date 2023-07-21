let localStream:MediaStream;
let remoteStream:MediaStream;
let peerConnection:RTCPeerConnection;

const server={
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
}

export const init=async()=>{
    localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
    return localStream
}

export const createOffer =async () =>{
    peerConnection=new RTCPeerConnection(server)
    remoteStream  = new MediaStream()

    localStream.getTracks().forEach((track)=>{
        peerConnection.addTrack(track,localStream)
    })

    peerConnection.ontrack=(event)=>{
        event.streams[0].getTracks().forEach((track)=>{
            remoteStream.addTrack(track)
        })
    }
    peerConnection.onicecandidate=async(event)=>{
        if(event.candidate){
            console.log('ice Candidate' ,event.candidate);
            
        }
    }
    let offer =await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log({offer});
    return {remoteStream,offer}
}