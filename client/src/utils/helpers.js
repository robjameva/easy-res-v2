export default function unformat_business_hours(hour) {
    switch (hour) {
        case '12:00 pm':
            return 12
        case '1:00 pm':
            return 13
        case '2:00 pm':
            return 14
        case '3:00 pm':
            return 15
        case '4:00 pm':
            return 16
        case '5:00 pm':
            return 17
        case '6:00 pm':
            return 18
        case '7:00 pm':
            return 19
        case '8:00 pm':
            return 20
        case '9:00 pm':
            return 21
        case '10:00 pm':
            return 22
        case '11:00 pm':
            return 23
        case '12:00 am':
            return 0
        case '1:00 am':
            return 1
        case '2:00 am':
            return 2
        case '3:00 am':
            return 3
        case '4:00 am':
            return 4
        case '5:00 am':
            return 5
        case '6:00 am':
            return 6
        case '7:00 am':
            return 7
        case '8:00 am':
            return 8
        case '9:00 am':
            return 9
        case '10:00 am':
            return 10
        case '11:00 am':
            return 11
    }
}