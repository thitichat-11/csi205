const AppFooter = () => {
    return ( 
        <div className="bg-yellow-400 text-white p-3 mt-4 d-flex justify-content-center align-items-center gap-2">
            มหาวิทยาลัยศรีปทุม คณะเทคโนโลยีสารสนเทศ สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
            &nbsp;
            <a href="https://www.instagram.com/na.juniiiper/" target="_blank" rel="noopener noreferrer">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="instgram"
            style={{ width: 32, height: 32, cursor: 'pointer' }} />
</a>

        </div>
     );
}
 
export default AppFooter;