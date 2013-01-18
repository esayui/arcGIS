package arcgis;

import org.eclipse.jface.action.Action;
import org.eclipse.jface.action.ActionContributionItem;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.action.ICoolBarManager;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.jface.action.IToolBarManager;
import org.eclipse.jface.action.MenuManager;
import org.eclipse.jface.action.Separator;
import org.eclipse.jface.action.ToolBarContributionItem;
import org.eclipse.jface.action.ToolBarManager;
import org.eclipse.swt.SWT;
import org.eclipse.ui.ISharedImages;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.actions.ActionFactory;
import org.eclipse.ui.actions.RetargetAction;
import org.eclipse.ui.application.ActionBarAdvisor;
import org.eclipse.ui.application.IActionBarConfigurer;


public class BrowserActionBarAdvisor extends ActionBarAdvisor{
	private IAction quitAction, aboutAction, newTabAction, newWindowAction;
    private RetargetAction stopAction, refreshAction, drawAction, clearAction, selectAction, rangeAction, clAction; 

    public BrowserActionBarAdvisor(IActionBarConfigurer configurer) {
        super(configurer);
	}
    
	protected void makeActions(final IWorkbenchWindow window) {
        //ISharedImages images = window.getWorkbench().getSharedImages();
        
        newWindowAction = ActionFactory.OPEN_NEW_WINDOW.create(window);
        newWindowAction.setText("&New Window");
        register(newWindowAction);
        
        newTabAction = new Action("New &Tab") { //$NON-NLS-1$
		    int counter = 0;
		    { setId("newTab");
              setActionDefinitionId("arcgis.commands." + "newTab"); } //$NON-NLS-1$
            public void run() {
                try {
                    String secondaryId = Integer.toString(++counter);
                    IWorkbenchPage page = window.getActivePage();
                    if (page != null) {
                    	//page.openEditor("http://localhost/arcGIS/index.html", Editor.ID);
                        page.showView("arcgis.browserView");
                    }
                } catch (PartInitException e) {
                    e.printStackTrace();
                }
            }
		};
        register(newTabAction);
		
		quitAction = ActionFactory.QUIT.create(window);
        register(quitAction);
		
		stopAction = new RetargetAction("stop", "Sto&p");
        stopAction.setActionDefinitionId("arcgis" + ".commands." + "stop"); //$NON-NLS-1$
		stopAction.setToolTipText("Stop");
		window.getPartService().addPartListener(stopAction);
		register(stopAction);
		
		refreshAction = new RetargetAction("refresh", "&Refresh");
        refreshAction.setActionDefinitionId("arcgis" + ".commands." + "refresh"); //$NON-NLS-1$
		refreshAction.setToolTipText("Refresh");
		window.getPartService().addPartListener(refreshAction);
		register(refreshAction);
		
		drawAction = new RetargetAction("draw", "&Draw");
		drawAction.setActionDefinitionId("arcgis" + ".commands." + "draw"); //$NON-NLS-1$
		drawAction.setToolTipText("Draw");
		window.getPartService().addPartListener(drawAction);
		register(drawAction);
		
		selectAction = new RetargetAction("select", "&Select");
		selectAction.setActionDefinitionId("arcgis" + ".commands." + "select"); //$NON-NLS-1$
		selectAction.setToolTipText("select");
		window.getPartService().addPartListener(selectAction);
		register(selectAction);
		
		rangeAction = new RetargetAction("range", "&Select Range");
		rangeAction.setActionDefinitionId("arcgis" + ".commands." + "range"); //$NON-NLS-1$
		rangeAction.setToolTipText("Select Range");
		window.getPartService().addPartListener(rangeAction);
		register(rangeAction);
		
		clearAction = new RetargetAction("clear", "&Clear Map");
		clearAction.setActionDefinitionId("arcgis" + ".commands." + "clear"); //$NON-NLS-1$
		clearAction.setToolTipText("Clear Map");
		window.getPartService().addPartListener(clearAction);
		register(clearAction);
		
		clAction = new RetargetAction("cl", "&Clear Selection");
		clAction.setActionDefinitionId("arcgis" + ".commands." + "cl"); //$NON-NLS-1$
		clAction.setToolTipText("Clear Selection");
		window.getPartService().addPartListener(clAction);
		register(clAction);
		
		aboutAction = ActionFactory.ABOUT.create(window);
        register(aboutAction);
	}

	protected void fillMenuBar(IMenuManager menuBar) {
		IMenuManager fileMenu = new MenuManager("&File", "file");  //$NON-NLS-2$
		menuBar.add(fileMenu);
		fileMenu.add(newTabAction);
		fileMenu.add(newWindowAction);
		fileMenu.add(new Separator());
        fileMenu.add(quitAction);
		
		IMenuManager viewMenu = new MenuManager("&View", "view");  //$NON-NLS-2$
		menuBar.add(viewMenu);
        viewMenu.add(stopAction);
        viewMenu.add(refreshAction);
	
		IMenuManager helpMenu = new MenuManager("&Help", "help");  //$NON-NLS-2$
		menuBar.add(helpMenu);
        helpMenu.add(aboutAction);
	}

	protected void fillCoolBar(ICoolBarManager coolBar) {
		IToolBarManager toolBar = new ToolBarManager();
		coolBar.add(new ToolBarContributionItem(toolBar, null)); //$NON-NLS-1$
		
		// For the Back and Forward actions, force their text to be shown on the toolbar,
		// not just their image.  For the remaining actions, the ActionContributionItem
		// is created implicitly with the default presentation mode.

		toolBar.add(stopAction);
		toolBar.add(refreshAction);
		toolBar.add(drawAction);
		toolBar.add(clearAction);
		toolBar.add(selectAction);
		toolBar.add(rangeAction);
		toolBar.add(clAction);
	}

}
