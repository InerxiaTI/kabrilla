use std::{process::{Child, Command, Stdio}, sync::Mutex};
use tauri::{App, Manager, Runtime, State, WindowEvent};
use tauri::path::BaseDirectory;
use tauri::AppHandle;
struct BackendProcess(Mutex<Option<Child>>);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app: &mut App| {
            // Correcto en Tauri v2: se pasa el directorio base explícitamente
            let exe_path = app
            .path()
            .resolve("bin/kabrilla-server-x86_64-pc-windows-msvc.exe", BaseDirectory::Resource)
            .expect("No se encontró el ejecutable");
            println!("ejecutado Backend... en {}", exe_path.display());

            let child = Command::new(exe_path)
                .spawn()
                .expect("Error al iniciar el backend");
            
            // Guardar el proceso para matarlo al salir
            println!("Backend ejecutado con exito...");
            app.manage(BackendProcess(Mutex::new(Some(child))));
            println!("Backend registrado con exito...");

            Ok(())
        })
        // En Tauri v2, el callback recibe 2 args: window y evento
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { .. } = event {
                println!("En eventos...");

                let backend_state = window.state::<BackendProcess>();
                
                // Encapsular el acceso al lock para liberar antes de que termine el bloque
                {
                    let mut lock = backend_state.0.lock().unwrap();
                    if let Some(child) = lock.as_mut() {
                        let _ = child.kill(); // mata el proceso
                    }
                    *lock = None; // limpias el estado
                }
            }
        })
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
