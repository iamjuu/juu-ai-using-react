// import React from 'react';
// import {Highlight,MicrophoneBody,MicrophoneGrille,MicrophoneStand,StyledSvg} from './MicStyle'

// const MicrophoneIcon = ({ 
//   size = 100, 
//   color = '#4a4a4a', 
//   hoverColor = '#007bff' 
// }) => {
//   return (
//     <StyledSvg 
//       xmlns="http://www.w3.org/2000/svg" 
//       viewBox="0 0 100 100" 
//       width={size} 
//       height={size}
//     >
//       <MicrophoneBody 
//         x="35" y="10" width="30" height="50" rx="15" 
//         fill={color}
//       />
      
//       <MicrophoneGrille cx="50" cy="25" r="12" fill={`${color}cc`} />
//       <MicrophoneGrille cx="50" cy="25" r="9" fill={`${color}dd`} />
//       <MicrophoneGrille cx="50" cy="25" r="6" fill={color} />
      
//       <MicrophoneStand x="48" y="60" width="4" height="25" fill={color} />
//       <MicrophoneStand x="30" y="85" width="40" height="5" rx="2.5" fill={color} />
      
//       <Highlight x="37" y="12" width="2" height="46" fill={`${color}11`} />
//       <Highlight x="61" y="12" width="2" height="46" fill={`${color}22`} opacity="0.5" />
      
//       <style>{`
//         ${StyledSvg}:hover ${MicrophoneBody},
//         ${StyledSvg}:hover ${MicrophoneGrille},
//         ${StyledSvg}:hover ${MicrophoneStand} {
//           fill: ${hoverColor};
//         }
//         ${StyledSvg}:hover ${Highlight} {
//           fill: ${hoverColor}22;
//         }
//       `}</style>
//     </StyledSvg>
//   );
// };

// export default MicrophoneIcon;