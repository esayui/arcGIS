package arcgis;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jface.action.Action;
import org.eclipse.jface.action.IStatusLineManager;
import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.browser.CloseWindowListener;
//import org.eclipse.swt.browser.LocationAdapter;
//import org.eclipse.swt.browser.LocationEvent;
import org.eclipse.swt.browser.OpenWindowListener;
import org.eclipse.swt.browser.ProgressAdapter;
import org.eclipse.swt.browser.ProgressEvent;
import org.eclipse.swt.browser.StatusTextEvent;
import org.eclipse.swt.browser.StatusTextListener;
import org.eclipse.swt.browser.TitleEvent;
import org.eclipse.swt.browser.TitleListener;
import org.eclipse.swt.browser.WindowEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.IMemento;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.IViewReference;
import org.eclipse.ui.IViewSite;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.WorkbenchException;
import org.eclipse.ui.part.ViewPart;
//import org.eclipse.swt.widgets.Label;

public class BrowserView extends ViewPart {
	
    /**
	 * Debug flag.  When true, status and progress messages are sent to the
	 * console in addition to the status line.
	 */
	private static final boolean DEBUG = false;
	
	private Browser browser;
	//private Text location;
	private String initialUrl;

	private Action stopAction = new Action("Stop") {
		public void run() {
			browser.stop();
			// cancel any partial progress.
			getViewSite().getActionBars().getStatusLineManager().getProgressMonitor().done();
		}
	};

	private Action refreshAction = new Action("Refresh") {
		public void run() {
			browser.refresh();
		}
	};
	
	private Action drawAction = new Action("Draw") {
		
		public void run() {
			browser.execute("polygon()");
		}
	};

private Action selectAction = new Action("Select") {
		
		public void run() {
			browser.execute("activateToolbar()");
		}
	};
	
private Action rangeAction = new Action("Select Range") {
		
		public void run() {
			browser.execute("activateTb()");
		}
	};
	
	private Action clearAction = new Action("Clear Map") {
		
		public void run() {
			browser.execute("clear()");
		}
	};
	
private Action clAction = new Action("Clear Selection") {
		
		public void run() {
			browser.execute("clearSelect()");
		}
	};
	
    /**
     * Finds the first browser view in the given window.
     * 
     * @param window the window
     * @return the first found browser view, or <code>null</code> if none found
     */
    private static BrowserView findBrowser(IWorkbenchWindow window) {
        IWorkbenchPage page = window.getActivePage();
        IViewPart view = page.findView("arcgis.browserView");
        if (view != null) {
            return (BrowserView) view;
        }
        IViewReference[] refs = page.getViewReferences();
        for (int i = 0; i < refs.length; i++) {
            if ("arcgis.browserView".equals(refs[i].getId())) {
                return (BrowserView) refs[i].getPart(true);
            }
        }
        return null;
    }
    
	/**
	 * Constructs a new <code>BrowserView</code>.
	 */
	public BrowserView() {
	    initialUrl = "http://localhost/arcGIS/index.html";
	}
	
    public void init(IViewSite site, IMemento memento) throws PartInitException {
        super.init(site);
        if (memento != null) {
	        String u = memento.getString("url");
	        if (u != null) {
	            initialUrl = u;
	        }
        }
    }
    
    public void saveState(IMemento memento) {
        memento.putString("url", browser.getUrl());
    }
    
	public void createPartControl(Composite parent) {
		browser = createBrowser(parent, getViewSite().getActionBars());
		browser.setUrl(initialUrl);
	}

	public void setFocus() {
		if (browser != null && !browser.isDisposed()) {
			browser.setFocus();
		}
	}
	
	private Browser createBrowser(Composite parent, final IActionBars actionBars) {
		
		Composite displayArea = new Composite(parent, SWT.NONE);
		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 1;
		displayArea.setLayout(gridLayout);
		
		//Label labelAddress = new Label(displayArea, SWT.NONE);
		//labelAddress.setText("A&ddress");
		
		/*location = new Text(displayArea, SWT.BORDER);
		GridData data = new GridData();
		data = new GridData();
		data.horizontalAlignment = GridData.FILL;
		data.grabExcessHorizontalSpace = true;
		location.setLayoutData(data);
		*/
		
		browser = new Browser(displayArea, SWT.FILL);
		GridData data = new GridData();
		data.horizontalAlignment = GridData.FILL;
		data.verticalAlignment = GridData.FILL;
		data.horizontalSpan = 1;
		data.grabExcessHorizontalSpace = true;
		data.grabExcessVerticalSpace = true;
		browser.setLayoutData(data);

		browser.addProgressListener(new ProgressAdapter() {
			IProgressMonitor monitor = actionBars.getStatusLineManager().getProgressMonitor();
			boolean working = false;
			int workedSoFar;
			public void changed(ProgressEvent event) {
				if (DEBUG) {
					System.out.println("changed: " + event.current + "/" + event.total);
				}
				if (event.total == 0) return;
				if (!working) {
					if (event.current == event.total) return;
					monitor.beginTask("", event.total); //$NON-NLS-1$
					workedSoFar = 0;
					working = true;
				}
				monitor.worked(event.current - workedSoFar);
				workedSoFar = event.current;
			}
			public void completed(ProgressEvent event) {
				if (DEBUG) {
					System.out.println("completed: " + event.current + "/" + event.total);
				}
				monitor.done();
				working = false;
			}
		});
		browser.addStatusTextListener(new StatusTextListener() {
			IStatusLineManager status = actionBars.getStatusLineManager(); 
			public void changed(StatusTextEvent event) {
				if (DEBUG) {
					System.out.println("status: " + event.text);
				}
				status.setMessage(event.text);
			}
		});
		/*browser.addLocationListener(new LocationAdapter() {
			public void changed(LocationEvent event) {
			    if (event.top)
			        location.setText(event.location);
			}
		});*/
		browser.addTitleListener(new TitleListener() {
            public void changed(TitleEvent event) {
                setPartName(event.title);
            }
        });
        browser.addOpenWindowListener(new OpenWindowListener() {
            public void open(WindowEvent event) {
                BrowserView.this.openWindow(event);
            }
        });
        // TODO: should handle VisibilityWindowListener.show and .hide events
        browser.addCloseWindowListener(new CloseWindowListener() {
            public void close(WindowEvent event) {
                BrowserView.this.close();
            }
        });
        
        actionBars.setGlobalActionHandler("stop", stopAction); //$NON-NLS-1$
		actionBars.setGlobalActionHandler("refresh", refreshAction); //$NON-NLS-1$
		actionBars.setGlobalActionHandler("draw", drawAction); //$NON-NLS-1$
		actionBars.setGlobalActionHandler("clear", clearAction); //$NON-NLS-1$
		actionBars.setGlobalActionHandler("select", selectAction); //$NON-NLS-1$
		actionBars.setGlobalActionHandler("range", rangeAction); //$NON-NLS-1$
		actionBars.setGlobalActionHandler("cl", clAction); //$NON-NLS-1$
		
		return browser;
	}

    /**
     * Opens a new browser window.
     * 
     * @param event the open window event
     */
    private void openWindow(WindowEvent event) {
        try {
            IWorkbench workbench = getSite().getWorkbenchWindow().getWorkbench();
            IWorkbenchWindow window = workbench.openWorkbenchWindow("arcgis.Perspective", null);
            Shell shell = window.getShell();
            if (event.location != null)
                shell.setLocation(event.location);
            if (event.size != null)
                shell.setLocation(event.size);
            BrowserView view = findBrowser(window);
            Assert.isNotNull(view);
            event.browser = view.browser;
        } catch (WorkbenchException e) {
            BrowserPlugin.getDefault().log(e);
        }
    }
    
    /**
     * Closes this browser view.  Closes the window too if there
     * are no non-secondary parts open.
     */
    private void close() {
        IWorkbenchPage page = getSite().getPage();
        IWorkbenchWindow window = page.getWorkbenchWindow();
        page.hideView(this);
        if (BrowserPlugin.getNonSecondaryParts(page).size() == 0) {
            page.closePerspective(page.getPerspective(), true, true);
        }
        if (window.getActivePage() == null) {
            window.close();
        }
    }

}

