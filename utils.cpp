#include "windows.h"
#include "QDebug"

void bringToFront(){
    HWND handle = FindWindow(NULL, L"Tester");  // where: Tester is your program name (title)
    DWORD dwCurID =  GetCurrentThreadId();
    DWORD dwForeID =  GetWindowThreadProcessId(handle, NULL );
    AttachThreadInput(dwCurID, dwForeID, TRUE);
    ShowWindow(handle, SW_SHOWNORMAL);
    SetWindowPos(handle, HWND_TOPMOST, 0,0,0,0, SWP_NOSIZE|SWP_NOMOVE );
    SetWindowPos(handle, HWND_NOTOPMOST, 0,0,0,0, SWP_NOSIZE|SWP_NOMOVE );
    SetForegroundWindow(handle);
    AttachThreadInput(dwCurID, dwForeID, FALSE);
    int ret = BringWindowToTop(handle);
    if(!ret) qDebug() << GetLastError();
}
