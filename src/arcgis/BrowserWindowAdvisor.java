package arcgis;

import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.application.ActionBarAdvisor;
import org.eclipse.ui.application.IActionBarConfigurer;
import org.eclipse.ui.application.IWorkbenchWindowConfigurer;
import org.eclipse.ui.application.WorkbenchWindowAdvisor;

public class BrowserWindowAdvisor extends WorkbenchWindowAdvisor {

    /**
     * Creates a new browser window advisor.
     * 
     * @param configurer the window configurer
     */
    public BrowserWindowAdvisor(IWorkbenchWindowConfigurer configurer) {
        super(configurer);
    }

    /* (non-Javadoc)
     * @see org.eclipse.ui.application.WorkbenchAdvisor
     */
    public void preWindowOpen() {
        IWorkbenchWindowConfigurer configurer = getWindowConfigurer();
        configurer.setInitialSize(new Point(800, 600));
        
        // Default window title is the product name, so don't need to set it
        // explicitly anymore.
      configurer.setTitle("arcGIS");
        
      //configurer.setShowFastViewBars(true);
    }

    
    /* (non-Javadoc)
     * @see org.eclipse.ui.application.WorkbenchWindowAdvisor#createActionBarAdvisor(org.eclipse.ui.application.IActionBarConfigurer)
     */
    public ActionBarAdvisor createActionBarAdvisor(
            IActionBarConfigurer actionBarConfigurer) {
        return new BrowserActionBarAdvisor(actionBarConfigurer);
    }
    
    /*public void createWindowContents(Shell shell) {
        IWorkbenchWindowConfigurer configurer = getWindowConfigurer();
        Menu menuBar = configurer.createMenuBar();
        shell.setMenuBar(menuBar);
        
        GridLayout shellLayout = new GridLayout();
        shellLayout.marginWidth = 0;
        shellLayout.marginHeight = 0;
        shellLayout.verticalSpacing = 0;
        shell.setLayout(shellLayout);
        
        Control pageComposite = configurer.createPageComposite(shell);
        pageComposite.setLayoutData(new GridData(GridData.FILL, GridData.FILL, true, true));
    }*/

}
