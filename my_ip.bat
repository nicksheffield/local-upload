for /f "delims=[] tokens=2" %%a in ('ping %computername% -n 1 ^| findstr "["') do (set thisip=%%a)
echo %thisip%
pause