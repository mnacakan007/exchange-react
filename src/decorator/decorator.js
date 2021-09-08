export function myDecorator(target, value, descriptor) {
  const oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(' I am the log from decorator');
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}
