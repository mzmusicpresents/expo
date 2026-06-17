import ExpoModulesCore
import WebKit

public class TestModule: Module {
  public func definition() -> ModuleDefinition {
    // AsyncFunction("setVideoCacheSizeAsync") { size in
    //   try VideoCacheManager.shared.setMaxCacheSize(newSize: size)
    // }
  }
}

struct EmptyStruct: Record {
    
}