// <!--Đàm Trọng Nhân, MSSV: B1910113 -->
document.addEventListener("DOMContentLoaded",function()
{
    var nut = document.querySelector('div.icon i');
    var mobile = document.querySelector('ul');
    nut.addEventListener('click',function()
        {
            mobile.classList.toggle('active');
        }
    )
}
)