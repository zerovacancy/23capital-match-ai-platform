import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface ArchitectureDiagramProps {
  className?: string;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ className }) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Helvetica, Arial, sans-serif',
      themeVariables: {
        'background': 'transparent',
        'primaryTextColor': '#275E91',
        'primaryBorderColor': '#275E91',
        'edgeLabelBackground': 'transparent',
        'tertiaryColor': 'transparent'
      }
    });

    if (diagramRef.current) {
      try {
        // Clear the container first
        diagramRef.current.innerHTML = '';
        
        // Insert the diagram definition
        const diagram = `flowchart TD
    classDef primaryBox fill:#275E91,stroke:#204E7A,color:white,stroke-width:2px
    classDef secondaryBox fill:#7A8D79,stroke:#677867,color:white,stroke-width:2px
    classDef accentBox fill:#5B7B9C,stroke:#4C6883,color:white,stroke-width:2px
    classDef subheadingStyle fill:#EAF2F8,stroke:#275E91,color:#275E91,stroke-width:1px
    classDef dataBox fill:#F0F4F8,stroke:#C3D5E5,color:#275E91,stroke-width:1px

    subgraph DS["DATA SOURCES"]
        HS["HubSpot CRM"]
        PF["Pro Forma Sheets"]
        PD["Pitch Decks"]
        MP["Market/Property Data"]
    end
    subgraph SL["SECURITY LAYER"]
        RA["Role-based Access"]
        EC["Encryption Controls"]
        CM["Compliance Management"]
        AT["Audit Trails"]
    end
    subgraph AI["AI CORE SYSTEM"]
        LP["LP Profile Engine"]
        DA["Deal Analysis Engine"]
        CR["Capital Raise Tracker"]
        MA["Market Analysis Engine"]
        MM["Matching Algorithm"]
        RG["Reporting Generator"]
    end
    subgraph FB["FEEDBACK LOOPS"]
        LF["LP Feedback Integration"]
        DO["Deal Outcomes"]
        OO["Outreach Optimization"]
        PL["Performance Learning"]
    end
    subgraph OUT["INTEGRATIONS"]
        MT["MS Teams Updates"]
        O365["Office 365 Documents"]
        HSA["HubSpot Actions"]
        SF["ShareFile Secure Docs"]
    end
    
    DS --> SL
    SL --> AI
    AI --> FB
    FB --> OUT
    
    class DS subheadingStyle
    class SL subheadingStyle
    class AI primaryBox
    class FB accentBox
    class OUT subheadingStyle
    
    class HS,PF,PD,MP dataBox
    class RA,EC,CM,AT dataBox
    class LP,DA,CR,MA,MM,RG dataBox
    class LF,DO,OO,PL dataBox
    class MT,O365,HSA,SF dataBox`;

        // Render the diagram
        mermaid.render('architecture-diagram', diagram).then((result) => {
          if (diagramRef.current) {
            diagramRef.current.innerHTML = result.svg;
          }
        });
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    }
  }, []);

  return (
    <div className={`mermaid-diagram-container ${className || ''}`}>
      <div ref={diagramRef} className="w-full overflow-auto bg-transparent [&_.label]:!text-white [&_.flowchart-label]:!font-bold"></div>
    </div>
  );
};

export default ArchitectureDiagram;