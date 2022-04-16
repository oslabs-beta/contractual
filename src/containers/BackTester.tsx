export default function BackTester() {
  return (
    <div className='back-tester-container'>
      <div className='request-container'>
        <div className='endpoint-container'>
          <input type='text' className='endpoint' placeholder='Project name' />
          <button className='send-request-button'>Send Request</button>
        </div>
        <div>
          <button className='method-dropdown'>Method-dropdown</button>
        </div>
      </div>
      <div className='api-dropdown'></div>
    </div>
  );
}
