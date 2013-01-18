package arcgis;

import org.eclipse.ui.application.IWorkbenchConfigurer;
import org.eclipse.ui.application.IWorkbenchWindowConfigurer;
import org.eclipse.ui.application.WorkbenchAdvisor;
import org.eclipse.ui.application.WorkbenchWindowAdvisor;

public class BrowserAdvisor extends WorkbenchAdvisor {

	/**
	 * Constructs a new <code>BrowserAdvisor</code>.
	 */
	public BrowserAdvisor() {
		
	}
	
    /* (non-Javadoc)
     * @see org.eclipse.ui.application.WorkbenchAdvisor
     */
    public void initialize(IWorkbenchConfigurer configurer) {
        super.initialize(configurer);
//        configurer.setSaveAndRestore(true);
    }
    
	/* (non-Javadoc)
	 * @see org.eclipse.ui.application.WorkbenchAdvisor
	 */
	public String getInitialWindowPerspectiveId() {
		return "arcGIS.perspective";
	}
    
    /* (non-Javadoc)
     * @see org.eclipse.ui.application.WorkbenchAdvisor
     */
    public WorkbenchWindowAdvisor createWorkbenchWindowAdvisor(
            IWorkbenchWindowConfigurer configurer) {
        return new BrowserWindowAdvisor(configurer);
    }
}